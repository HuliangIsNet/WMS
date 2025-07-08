using Prism.Events;
using System.Collections.Generic;
using System.Threading.Tasks;
using WCS.Infrastructure.DTOs;
using WCS.Infrastructure.Events;
using WCS.Infrastructure.Interfaces;

namespace WCS.Shell.Services;

public class MockAlertService : IAlertService
{
    private readonly List<AlertDto> _alerts = new();
    private readonly IEventAggregator _eventAggregator;
    private int _nextId = 1;

    public MockAlertService(IEventAggregator eventAggregator)
    {
        _eventAggregator = eventAggregator;
        // simulate random alerts
        _ = Task.Run(async () =>
        {
            var rnd = new Random();
            string[] severities = { "Info", "Warning", "Error" };
            while (true)
            {
                await Task.Delay(TimeSpan.FromSeconds(20));
                var alert = new AlertDto
                {
                    Id = _nextId++,
                    Message = $"模拟告警 {_nextId}",
                    Severity = severities[rnd.Next(severities.Length)],
                    Timestamp = DateTime.UtcNow
                };
                await RaiseAlertAsync(alert);
            }
        });
    }

    public Task<IReadOnlyList<AlertDto>> GetAlertsAsync(CancellationToken cancellationToken = default)
        => Task.FromResult((IReadOnlyList<AlertDto>)_alerts);

    public Task RaiseAlertAsync(AlertDto alert, CancellationToken cancellationToken = default)
    {
        _alerts.Insert(0, alert);
        _eventAggregator.GetEvent<AlertRaisedEvent>().Publish(alert);
        return Task.CompletedTask;
    }
}
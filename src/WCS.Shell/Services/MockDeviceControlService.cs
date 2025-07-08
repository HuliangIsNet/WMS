using Prism.Events;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WCS.Infrastructure.DTOs;
using WCS.Infrastructure.Events;
using WCS.Infrastructure.Interfaces;

namespace WCS.Shell.Services;

public class MockDeviceControlService : IDeviceControlService
{
    private readonly List<DeviceInfoDto> _devices = new()
    {
        new DeviceInfoDto { Id = 1, Name = "Conveyor 1", Status = "Stopped" },
        new DeviceInfoDto { Id = 2, Name = "Conveyor 2", Status = "Stopped" },
        new DeviceInfoDto { Id = 3, Name = "Elevator", Status = "Stopped" }
    };

    private readonly IEventAggregator _eventAggregator;

    public MockDeviceControlService(IEventAggregator eventAggregator)
    {
        _eventAggregator = eventAggregator;

        // Simulate status heartbeat every 5 seconds (optional)
        _ = Task.Run(async () =>
        {
            var rnd = new Random();
            while (true)
            {
                await Task.Delay(TimeSpan.FromSeconds(10));
                var device = _devices[rnd.Next(_devices.Count)];
                var status = rnd.Next(2) == 0 ? "Running" : "Stopped";
                UpdateDeviceStatus(device.Id, status);
            }
        });
    }

    public Task<IReadOnlyList<DeviceInfoDto>> GetDevicesAsync(CancellationToken cancellationToken = default)
        => Task.FromResult((IReadOnlyList<DeviceInfoDto>)_devices);

    public Task SendCommandAsync(int deviceId, string command, CancellationToken cancellationToken = default)
    {
        var device = _devices.FirstOrDefault(d => d.Id == deviceId);
        if (device == null)
            throw new InvalidOperationException($"Device {deviceId} not found");

        string newStatus = command switch
        {
            "Start" => "Running",
            "Stop" => "Stopped",
            _ => device.Status
        };

        UpdateDeviceStatus(deviceId, newStatus);
        return Task.CompletedTask;
    }

    private void UpdateDeviceStatus(int deviceId, string status)
    {
        var device = _devices.First(d => d.Id == deviceId);
        _devices.Remove(device);
        _devices.Add(device with { Status = status });

        _eventAggregator.GetEvent<DeviceStatusChangedEvent>()
                        .Publish(new DeviceStatusArgs { DeviceId = deviceId, Status = status, Timestamp = DateTime.UtcNow });
    }
}
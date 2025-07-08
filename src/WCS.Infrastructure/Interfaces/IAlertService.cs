using WCS.Infrastructure.DTOs;

namespace WCS.Infrastructure.Interfaces;

public interface IAlertService
{
    Task<IReadOnlyList<AlertDto>> GetAlertsAsync(CancellationToken cancellationToken = default);
    Task RaiseAlertAsync(AlertDto alert, CancellationToken cancellationToken = default);
}
using WCS.Infrastructure.DTOs;

namespace WCS.Infrastructure.Interfaces;

public interface ITaskService
{
    Task<IReadOnlyList<TaskInfoDto>> GetActiveTasksAsync(CancellationToken cancellationToken = default);
    Task UpdateTaskAsync(TaskInfoDto task, CancellationToken cancellationToken = default);
}
using Prism.Events;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WCS.Infrastructure.DTOs;
using WCS.Infrastructure.Events;
using WCS.Infrastructure.Interfaces;

namespace WCS.Shell.Services;

public class MockTaskService : ITaskService
{
    private readonly List<TaskInfoDto> _tasks = new()
    {
        new TaskInfoDto { Id = 101, Description = "出库任务 #101", Status = "Running", Priority = 1 },
        new TaskInfoDto { Id = 102, Description = "入库任务 #102", Status = "Pending", Priority = 2 }
    };

    private readonly IEventAggregator _eventAggregator;

    public MockTaskService(IEventAggregator eventAggregator)
    {
        _eventAggregator = eventAggregator;

        // simulate status updates
        _ = Task.Run(async () =>
        {
            while (true)
            {
                await Task.Delay(TimeSpan.FromSeconds(15));
                var task = _tasks.First();
                var newStatus = task.Status == "Running" ? "Completed" : "Running";
                var updated = task with { Status = newStatus };
                _tasks[_tasks.IndexOf(task)] = updated;
                _eventAggregator.GetEvent<TaskUpdatedEvent>().Publish(updated);
            }
        });
    }

    public Task<IReadOnlyList<TaskInfoDto>> GetActiveTasksAsync(CancellationToken cancellationToken = default)
        => Task.FromResult((IReadOnlyList<TaskInfoDto>)_tasks);

    public Task UpdateTaskAsync(TaskInfoDto task, CancellationToken cancellationToken = default)
    {
        var existing = _tasks.FirstOrDefault(t => t.Id == task.Id);
        if (existing is not null)
            _tasks.Remove(existing);
        _tasks.Add(task);
        _eventAggregator.GetEvent<TaskUpdatedEvent>().Publish(task);
        return Task.CompletedTask;
    }
}
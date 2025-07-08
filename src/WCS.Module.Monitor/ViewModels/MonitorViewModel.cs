using Prism.Events;
using Prism.Mvvm;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using WCS.Infrastructure.DTOs;
using WCS.Infrastructure.Events;
using WCS.Infrastructure.Interfaces;

namespace WCS.Module.Monitor.ViewModels;

public class MonitorViewModel : BindableBase
{
    private readonly IDeviceControlService _deviceControlService;
    private readonly ITaskService _taskService;
    private readonly IAlertService _alertService;
    private readonly IEventAggregator _eventAggregator;

    public MonitorViewModel(IDeviceControlService deviceControlService,
                             ITaskService taskService,
                             IAlertService alertService,
                             IEventAggregator eventAggregator)
    {
        _deviceControlService = deviceControlService;
        _taskService = taskService;
        _alertService = alertService;
        _eventAggregator = eventAggregator;

        Devices = new ObservableCollection<DeviceInfoDto>();
        ActiveTasks = new ObservableCollection<TaskInfoDto>();
        Alerts = new ObservableCollection<AlertDto>();

        _eventAggregator.GetEvent<DeviceStatusChangedEvent>()
                        .Subscribe(OnDeviceStatusChanged, ThreadOption.UIThread);
        _eventAggregator.GetEvent<TaskUpdatedEvent>()
                        .Subscribe(OnTaskUpdated, ThreadOption.UIThread);
        _eventAggregator.GetEvent<AlertRaisedEvent>()
                        .Subscribe(OnAlertRaised, ThreadOption.UIThread);

        _ = LoadInitialDataAsync();
    }

    #region Properties

    public ObservableCollection<DeviceInfoDto> Devices { get; }
    public ObservableCollection<TaskInfoDto> ActiveTasks { get; }
    public ObservableCollection<AlertDto> Alerts { get; }

    #endregion

    private async Task LoadInitialDataAsync()
    {
        try
        {
            var devices = await _deviceControlService.GetDevicesAsync();
            var tasks = await _taskService.GetActiveTasksAsync();
            var alerts = await _alertService.GetAlertsAsync();

            Application.Current.Dispatcher.Invoke(() =>
            {
                Devices.Clear();
                foreach (var d in devices) Devices.Add(d);
                ActiveTasks.Clear();
                foreach (var t in tasks) ActiveTasks.Add(t);
                Alerts.Clear();
                foreach (var a in alerts) Alerts.Add(a);
            });
        }
        catch (Exception ex)
        {
            // logging or show message
            System.Diagnostics.Debug.WriteLine(ex);
        }
    }

    private void OnDeviceStatusChanged(DeviceStatusArgs args)
    {
        var device = Devices.FirstOrDefault(d => d.Id == args.DeviceId);
        if (device != null)
        {
            var index = Devices.IndexOf(device);
            Devices[index] = device with { Status = args.Status };
        }
        else
        {
            Devices.Add(new DeviceInfoDto { Id = args.DeviceId, Name = $"Device {args.DeviceId}", Status = args.Status });
        }
    }

    private void OnTaskUpdated(TaskInfoDto task)
    {
        var existing = ActiveTasks.FirstOrDefault(t => t.Id == task.Id);
        if (existing != null)
        {
            var index = ActiveTasks.IndexOf(existing);
            ActiveTasks[index] = task;
        }
        else
        {
            ActiveTasks.Add(task);
        }
    }

    private void OnAlertRaised(AlertDto alert)
    {
        Alerts.Insert(0, alert);
        // Optionally, keep only recent alerts
        if (Alerts.Count > 100)
        {
            Alerts.RemoveAt(Alerts.Count - 1);
        }
    }
}
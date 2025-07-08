using Prism.Commands;
using Prism.Events;
using Prism.Mvvm;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Linq;
using System.Windows;
using WCS.Infrastructure.DTOs;
using WCS.Infrastructure.Events;
using WCS.Infrastructure.Interfaces;

namespace WCS.Module.Control.ViewModels;

public class ControlViewModel : BindableBase
{
    private readonly IDeviceControlService _deviceControlService;
    private readonly IEventAggregator _eventAggregator;

    public ControlViewModel(IDeviceControlService deviceControlService, IEventAggregator eventAggregator)
    {
        _deviceControlService = deviceControlService;
        _eventAggregator = eventAggregator;

        Devices = new ObservableCollection<DeviceInfoDto>();
        StartCommand = new DelegateCommand(async () => await SendCommandAsync("Start"), CanExecuteCommand)
                        .ObservesProperty(() => SelectedDevice);
        StopCommand = new DelegateCommand(async () => await SendCommandAsync("Stop"), CanExecuteCommand)
                        .ObservesProperty(() => SelectedDevice);

        // Subscribe to status changed event
        _eventAggregator.GetEvent<DeviceStatusChangedEvent>()
                        .Subscribe(OnDeviceStatusChanged, ThreadOption.UIThread);

        _ = LoadDevicesAsync();
    }

    #region Properties

    public ObservableCollection<DeviceInfoDto> Devices { get; }

    private DeviceInfoDto? _selectedDevice;
    public DeviceInfoDto? SelectedDevice
    {
        get => _selectedDevice;
        set
        {
            if (SetProperty(ref _selectedDevice, value))
            {
                RaisePropertyChanged(nameof(CanSendCommand));
            }
        }
    }

    public bool CanSendCommand => SelectedDevice is not null;

    #endregion

    #region Commands

    public DelegateCommand StartCommand { get; }
    public DelegateCommand StopCommand { get; }

    private bool CanExecuteCommand() => CanSendCommand;

    private async Task SendCommandAsync(string command)
    {
        if (SelectedDevice is null) return;

        try
        {
            await _deviceControlService.SendCommandAsync(SelectedDevice.Id, command);
        }
        catch (Exception ex)
        {
            // TODO: notification
            MessageBox.Show(ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
        }
    }

    #endregion

    private async Task LoadDevicesAsync()
    {
        try
        {
            var list = await _deviceControlService.GetDevicesAsync();
            Application.Current.Dispatcher.Invoke(() =>
            {
                Devices.Clear();
                foreach (var device in list)
                {
                    Devices.Add(device);
                }
            });
        }
        catch (Exception ex)
        {
            MessageBox.Show(ex.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
        }
    }

    private void OnDeviceStatusChanged(DeviceStatusArgs args)
    {
        var device = Devices.FirstOrDefault(d => d.Id == args.DeviceId);
        if (device != null)
        {
            // Replace existing device status with new record to trigger UI update
            var index = Devices.IndexOf(device);
            Devices[index] = device with { Status = args.Status };
        }
        else
        {
            // If device not present, add it
            Devices.Add(new DeviceInfoDto { Id = args.DeviceId, Name = $"Device {args.DeviceId}", Status = args.Status });
        }
    }
}
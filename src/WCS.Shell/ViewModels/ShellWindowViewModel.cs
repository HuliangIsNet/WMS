using Prism.Events;
using Prism.Mvvm;

namespace WCS.Shell.ViewModels;

public class ShellWindowViewModel : BindableBase
{
    private readonly IEventAggregator _eventAggregator;

    public ShellWindowViewModel(IEventAggregator eventAggregator)
    {
        _eventAggregator = eventAggregator;
        SystemStatus = "Ready";

        // Subscribe to global events if required in future
        // _eventAggregator.GetEvent<SomeEvent>().Subscribe(...);
    }

    private string _systemStatus;
    public string SystemStatus
    {
        get => _systemStatus;
        set => SetProperty(ref _systemStatus, value);
    }
}
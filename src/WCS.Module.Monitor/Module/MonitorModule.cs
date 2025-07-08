using Prism.Ioc;
using Prism.Modularity;
using Prism.Regions;
using WCS.Module.Monitor.Views;

namespace WCS.Module.Monitor.Module;

public class MonitorModule : IModule
{
    private readonly IRegionManager _regionManager;

    public MonitorModule(IRegionManager regionManager)
    {
        _regionManager = regionManager;
    }

    public void RegisterTypes(IContainerRegistry containerRegistry)
    {
        containerRegistry.RegisterForNavigation<MonitorView>(nameof(MonitorView));
    }

    public void OnInitialized(IContainerProvider containerProvider)
    {
        _regionManager.RequestNavigate("NavigationRegion", nameof(MonitorView));
    }
}
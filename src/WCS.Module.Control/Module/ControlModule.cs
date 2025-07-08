using Prism.Ioc;
using Prism.Modularity;
using Prism.Regions;
using WCS.Module.Control.Views;

namespace WCS.Module.Control.Module;

public class ControlModule : IModule
{
    private readonly IRegionManager _regionManager;

    public ControlModule(IRegionManager regionManager)
    {
        _regionManager = regionManager;
    }

    public void RegisterTypes(IContainerRegistry containerRegistry)
    {
        containerRegistry.RegisterForNavigation<ControlView>(nameof(ControlView));
    }

    public void OnInitialized(IContainerProvider containerProvider)
    {
        _regionManager.RequestNavigate("NavigationRegion", nameof(ControlView));
    }
}
using Prism.Ioc;
using Prism.Modularity;
using Prism.Regions;
using WCS.Module.Inventory.Views;

namespace WCS.Module.Inventory.Module;

public class InventoryModule : IModule
{
    private readonly IRegionManager _regionManager;

    public InventoryModule(IRegionManager regionManager)
    {
        _regionManager = regionManager;
    }

    public void RegisterTypes(IContainerRegistry containerRegistry)
    {
        containerRegistry.RegisterForNavigation<InventoryView>(nameof(InventoryView));
    }

    public void OnInitialized(IContainerProvider containerProvider)
    {
        // 可在初始化时将视图放到导航区域，或者留给导航菜单
        _regionManager.RequestNavigate("NavigationRegion", nameof(InventoryView));
    }
}
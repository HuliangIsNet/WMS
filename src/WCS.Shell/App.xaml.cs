using Prism.DryIoc;
using Prism.Ioc;
using System.Windows;
using WCS.Infrastructure.Interfaces;
using WCS.Shell.Services;
// TODO: update namespaces as needed when modules are referenced

namespace WCS.Shell;

public partial class App : PrismApplication
{
    protected override Window CreateShell()
    {
        return Container.Resolve<Views.ShellWindow>();
    }

    protected override void RegisterTypes(IContainerRegistry containerRegistry)
    {
        containerRegistry.RegisterSingleton<WCS.Infrastructure.Interfaces.IWarehouseService, Services.MockWarehouseService>();
    }

    protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
    {
        // Example of adding modules once references are added
        moduleCatalog.AddModule<WCS.Module.Inventory.Module.InventoryModule>();
        // moduleCatalog.AddModule<WCS.Module.Control.ControlModule>();
        // moduleCatalog.AddModule<WCS.Module.Monitor.MonitorModule>();
        // moduleCatalog.AddModule<WCS.Module.Reports.ReportsModule>(InitializationMode.OnDemand);
    }
}
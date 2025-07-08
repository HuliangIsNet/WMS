using Prism.Mvvm;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Windows;
using WCS.Infrastructure.DTOs;
using WCS.Infrastructure.Interfaces;

namespace WCS.Module.Inventory.ViewModels;

public class InventoryViewModel : BindableBase
{
    private readonly IWarehouseService _warehouseService;

    public InventoryViewModel(IWarehouseService warehouseService)
    {
        _warehouseService = warehouseService;
        Items = new ObservableCollection<ItemDto>();
        _ = LoadInventoryAsync();
    }

    public ObservableCollection<ItemDto> Items { get; }

    private async Task LoadInventoryAsync()
    {
        try
        {
            var list = await _warehouseService.GetInventoryAsync();
            App.Current.Dispatcher.Invoke(() =>
            {
                Items.Clear();
                foreach (var item in list)
                {
                    Items.Add(item);
                }
            });
        }
        catch (Exception ex)
        {
            // TODO: logging or user notification
            System.Diagnostics.Debug.WriteLine(ex);
        }
    }
}
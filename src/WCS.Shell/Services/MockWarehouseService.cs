using WCS.Infrastructure.Interfaces;
using WCS.Infrastructure.DTOs;

namespace WCS.Shell.Services;

/// <summary>
/// 临时内存实现，供演示与前端调试使用。
/// </summary>
public class MockWarehouseService : IWarehouseService
{
    private readonly List<ItemDto> _items = new()
    {
        new ItemDto { Code = "A1001", Name = "箱子", Quantity = 120 },
        new ItemDto { Code = "B2003", Name = "托盘", Quantity = 45 },
        new ItemDto { Code = "C3005", Name = "标签", Quantity = 2000 }
    };

    public Task<IReadOnlyList<ItemDto>> GetInventoryAsync(CancellationToken cancellationToken = default)
        => Task.FromResult((IReadOnlyList<ItemDto>)_items);

    public Task UpdateInventoryAsync(ItemDto item, CancellationToken cancellationToken = default)
    {
        var existing = _items.FirstOrDefault(i => i.Code == item.Code);
        if (existing is not null)
        {
            _items.Remove(existing);
        }
        _items.Add(item);
        return Task.CompletedTask;
    }

    public Task PublishDeviceStatusAsync(DeviceStatusArgs status, CancellationToken cancellationToken = default)
    {
        // Not implemented for mock
        return Task.CompletedTask;
    }
}
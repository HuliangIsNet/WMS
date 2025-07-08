using WCS.Infrastructure.DTOs;

namespace WCS.Infrastructure.Interfaces;

/// <summary>
/// WCS 仓库业务服务接口 — 由后端实现，供前端各模块调用
/// </summary>
public interface IWarehouseService
{
    /// <summary>
    /// 获取库存列表
    /// </summary>
    Task<IReadOnlyList<ItemDto>> GetInventoryAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// 更新/写入库存信息
    /// </summary>
    Task UpdateInventoryAsync(ItemDto item, CancellationToken cancellationToken = default);

    /// <summary>
    /// 发布设备状态变化（通常由后端推送）
    /// </summary>
    Task PublishDeviceStatusAsync(DeviceStatusArgs status, CancellationToken cancellationToken = default);
}
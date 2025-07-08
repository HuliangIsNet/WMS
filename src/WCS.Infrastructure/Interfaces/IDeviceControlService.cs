using WCS.Infrastructure.DTOs;

namespace WCS.Infrastructure.Interfaces;

/// <summary>
/// 设备控制服务接口 — 向设备发送命令、查询状态
/// </summary>
public interface IDeviceControlService
{
    /// <summary>
    /// 获取所有设备信息
    /// </summary>
    Task<IReadOnlyList<DeviceInfoDto>> GetDevicesAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// 向指定设备发送命令（如 Start、Stop、Reset）
    /// </summary>
    Task SendCommandAsync(int deviceId, string command, CancellationToken cancellationToken = default);
}
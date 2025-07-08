namespace WCS.Infrastructure.DTOs;

/// <summary>
/// 设备状态更改参数
/// </summary>
public record DeviceStatusArgs
{
    public int DeviceId { get; init; }
    public string Status { get; init; } = string.Empty;
    public DateTime Timestamp { get; init; } = DateTime.UtcNow;
}
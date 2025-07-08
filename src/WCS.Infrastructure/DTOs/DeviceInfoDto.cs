namespace WCS.Infrastructure.DTOs;

/// <summary>
/// 设备信息 DTO
/// </summary>
public record DeviceInfoDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
}
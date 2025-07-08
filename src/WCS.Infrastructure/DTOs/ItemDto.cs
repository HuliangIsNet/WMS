namespace WCS.Infrastructure.DTOs;

/// <summary>
/// 数据传输对象：库存物料
/// </summary>
public record ItemDto
{
    public string Code { get; init; } = string.Empty;
    public string Name { get; init; } = string.Empty;
    public int Quantity { get; init; }
}
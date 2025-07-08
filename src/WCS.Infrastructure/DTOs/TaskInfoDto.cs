namespace WCS.Infrastructure.DTOs;

/// <summary>
/// 任务信息 DTO
/// </summary>
public record TaskInfoDto
{
    public int Id { get; init; }
    public string Description { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty; // e.g., Pending, Running, Completed
    public int Priority { get; init; }
}
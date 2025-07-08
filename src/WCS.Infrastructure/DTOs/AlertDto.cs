namespace WCS.Infrastructure.DTOs;

/// <summary>
/// 系统告警 DTO
/// </summary>
public record AlertDto
{
    public int Id { get; init; }
    public string Message { get; init; } = string.Empty;
    public string Severity { get; init; } = "Info"; // Info, Warning, Error, Critical
    public DateTime Timestamp { get; init; } = DateTime.UtcNow;
}
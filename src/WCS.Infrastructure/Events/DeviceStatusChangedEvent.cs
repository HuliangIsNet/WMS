using Prism.Events;
using WCS.Infrastructure.DTOs;

namespace WCS.Infrastructure.Events;

/// <summary>
/// 设备状态更改事件 — 前端内部跨模块通信
/// </summary>
public class DeviceStatusChangedEvent : PubSubEvent<DeviceStatusArgs>
{
}
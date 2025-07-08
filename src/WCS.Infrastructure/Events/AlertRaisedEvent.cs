using Prism.Events;
using WCS.Infrastructure.DTOs;

namespace WCS.Infrastructure.Events;

public class AlertRaisedEvent : PubSubEvent<AlertDto>
{
}
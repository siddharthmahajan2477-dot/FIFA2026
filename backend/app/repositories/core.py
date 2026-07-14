from backend.app.repositories.base import BaseRepository

# Auth & Users
from backend.app.models.auth.models import User, Role
from backend.app.models.users.models import UserProfile, Address

# Football
from backend.app.models.football.models import Match, Team, Player, Stadium

# Tickets & Commerce
from backend.app.models.tickets.models import Ticket, Order, Payment
from backend.app.models.commerce.models import CommerceOrder, Product, MenuItem

# Operations & Infrastructure
from backend.app.models.operations.models import Incident, Task, Employee
from backend.app.models.infrastructure.models import Asset

# Navigation & Notifications
from backend.app.models.navigation.models import Location
from backend.app.models.notifications.models import Notification

class UserRepository(BaseRepository[User]):
    pass

class RoleRepository(BaseRepository[Role]):
    pass

class UserProfileRepository(BaseRepository[UserProfile]):
    pass

class MatchRepository(BaseRepository[Match]):
    pass

class TeamRepository(BaseRepository[Team]):
    pass

class PlayerRepository(BaseRepository[Player]):
    pass

class StadiumRepository(BaseRepository[Stadium]):
    pass

class TicketRepository(BaseRepository[Ticket]):
    pass

class OrderRepository(BaseRepository[Order]):
    pass

class CommerceOrderRepository(BaseRepository[CommerceOrder]):
    pass

class ProductRepository(BaseRepository[Product]):
    pass

class IncidentRepository(BaseRepository[Incident]):
    pass

class TaskRepository(BaseRepository[Task]):
    pass

class EmployeeRepository(BaseRepository[Employee]):
    pass

class AssetRepository(BaseRepository[Asset]):
    pass

class LocationRepository(BaseRepository[Location]):
    pass

class NotificationRepository(BaseRepository[Notification]):
    pass

# Instantiate singletons for dependency injection
user_repo = UserRepository(User)
role_repo = RoleRepository(Role)
profile_repo = UserProfileRepository(UserProfile)
match_repo = MatchRepository(Match)
team_repo = TeamRepository(Team)
player_repo = PlayerRepository(Player)
stadium_repo = StadiumRepository(Stadium)
ticket_repo = TicketRepository(Ticket)
order_repo = OrderRepository(Order)
commerce_order_repo = CommerceOrderRepository(CommerceOrder)
product_repo = ProductRepository(Product)
incident_repo = IncidentRepository(Incident)
task_repo = TaskRepository(Task)
employee_repo = EmployeeRepository(Employee)
asset_repo = AssetRepository(Asset)
location_repo = LocationRepository(Location)
notification_repo = NotificationRepository(Notification)

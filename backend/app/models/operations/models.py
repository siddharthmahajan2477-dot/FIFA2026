from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Numeric, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class Department(BaseModel):
    __tablename__ = "departments"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    manager_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    
    # Relationships
    employees = relationship("Employee", back_populates="department")

class Employee(BaseModel):
    __tablename__ = "employees"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id", ondelete="SET NULL"), nullable=True, index=True)
    job_title = Column(String(100), nullable=False)
    access_level = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    department = relationship("Department", back_populates="employees")
    shifts = relationship("Shift", foreign_keys="[Shift.employee_id]", back_populates="employee")

class Volunteer(BaseModel):
    __tablename__ = "volunteers"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    role_description = Column(String(100), nullable=False)
    zone_assignment_id = Column(Integer, ForeignKey("locations.id", ondelete="SET NULL"), nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    shifts = relationship("Shift", foreign_keys="[Shift.volunteer_id]", back_populates="volunteer")

class Shift(BaseModel):
    __tablename__ = "shifts"
    
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"), nullable=True, index=True)
    volunteer_id = Column(Integer, ForeignKey("volunteers.id", ondelete="CASCADE"), nullable=True, index=True)
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    shift_role = Column(String(100), nullable=False)
    
    # Relationships
    employee = relationship("Employee", foreign_keys=[employee_id], back_populates="shifts")
    volunteer = relationship("Volunteer", foreign_keys=[volunteer_id], back_populates="shifts")

class Task(BaseModel):
    __tablename__ = "tasks"
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    assigned_to_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    priority = Column(String(50), default="medium") # low, medium, high, critical
    task_status = Column(String(50), default="open") # open, in_progress, completed, blocked
    due_date = Column(DateTime(timezone=True), nullable=True)

class Incident(BaseModel):
    __tablename__ = "incidents"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="SET NULL"), nullable=True)
    reported_by_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    assigned_to_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    incident_type = Column(String(50), nullable=False) # general, security, medical, facilities
    severity = Column(String(50), default="low", index=True) # low, medium, high, critical
    incident_status = Column(String(50), default="open", index=True) # open, in_progress, resolved, closed

class SecurityIncident(BaseModel):
    __tablename__ = "security_incidents"
    
    incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="CASCADE"), unique=True, nullable=False)
    threat_level = Column(String(50), nullable=False)
    requires_police = Column(Boolean, default=False)
    suspect_description = Column(Text, nullable=True)
    action_taken = Column(Text, nullable=True)

class MedicalIncident(BaseModel):
    __tablename__ = "medical_incidents"
    
    incident_id = Column(Integer, ForeignKey("incidents.id", ondelete="CASCADE"), unique=True, nullable=False)
    patient_condition = Column(String(100), nullable=False)
    requires_ambulance = Column(Boolean, default=False)
    treatment_provided = Column(Text, nullable=True)

class EmergencyEvent(BaseModel):
    __tablename__ = "emergency_events"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    event_type = Column(String(100), nullable=False) # fire, active_shooter, weather, structural
    declared_by_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    declaration_time = Column(DateTime(timezone=True), nullable=False)
    is_active = Column(Boolean, default=True, index=True)
    evacuation_triggered = Column(Boolean, default=False)

class CrowdZone(BaseModel):
    __tablename__ = "crowd_zones"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    max_capacity = Column(Integer, nullable=False)
    current_occupancy = Column(Integer, default=0)

class CrowdDensityLog(BaseModel):
    __tablename__ = "crowd_density_logs"
    
    zone_id = Column(Integer, ForeignKey("crowd_zones.id", ondelete="CASCADE"), nullable=False, index=True)
    recorded_at = Column(DateTime(timezone=True), nullable=False, index=True)
    occupancy = Column(Integer, nullable=False)
    density_level = Column(String(50), nullable=False) # low, medium, high, critical

class QueueAnalytics(BaseModel):
    __tablename__ = "queue_analytics"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    queue_name = Column(String(100), nullable=False) # Gate A, Restroom N1, Concession 5
    recorded_at = Column(DateTime(timezone=True), nullable=False, index=True)
    queue_length = Column(Integer, default=0)
    wait_time_minutes = Column(Numeric(5, 2), default=0)

class BusStop(BaseModel):
    __tablename__ = "bus_stops"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    latitude = Column(Numeric(10, 8), nullable=True)
    longitude = Column(Numeric(11, 8), nullable=True)
    is_active = Column(Boolean, default=True)

class MetroStation(BaseModel):
    __tablename__ = "metro_stations"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    line_color = Column(String(50), nullable=True)
    distance_to_stadium_meters = Column(Numeric(10, 2), nullable=True)
    is_active = Column(Boolean, default=True)

class TaxiZone(BaseModel):
    __tablename__ = "taxi_zones"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    current_taxis = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class ShuttleRoute(BaseModel):
    __tablename__ = "shuttle_routes"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    route_path = Column(JSON, nullable=True)
    frequency_minutes = Column(Integer, nullable=True)

class TrafficLog(BaseModel):
    __tablename__ = "traffic_logs"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    recorded_at = Column(DateTime(timezone=True), nullable=False, index=True)
    road_name = Column(String(100), nullable=False)
    congestion_level = Column(String(50), nullable=False) # light, moderate, heavy, gridlock
    average_speed_kmh = Column(Numeric(5, 2), nullable=True)

class VehicleTracking(BaseModel):
    __tablename__ = "vehicle_tracking"
    
    vehicle_id = Column(String(100), unique=True, index=True, nullable=False)
    vehicle_type = Column(String(50), nullable=False) # bus, shuttle, taxi, police, ambulance
    latitude = Column(Numeric(10, 8), nullable=False)
    longitude = Column(Numeric(11, 8), nullable=False)
    speed_kmh = Column(Numeric(5, 2), nullable=True)
    last_updated_at = Column(DateTime(timezone=True), nullable=False)

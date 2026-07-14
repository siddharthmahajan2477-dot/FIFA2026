from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Numeric, DateTime, JSON
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class PowerGrid(BaseModel):
    __tablename__ = "power_grids"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    zone_name = Column(String(100), nullable=False)
    current_load_kw = Column(Numeric(10, 2), default=0)
    max_capacity_kw = Column(Numeric(10, 2), nullable=False)
    grid_status = Column(String(50), default="normal", index=True) # normal, warning, critical, offline

class WaterNetwork(BaseModel):
    __tablename__ = "water_networks"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    zone_name = Column(String(100), nullable=False)
    flow_rate_lps = Column(Numeric(10, 2), default=0) # liters per second
    pressure_psi = Column(Numeric(10, 2), default=0)
    network_status = Column(String(50), default="normal")

class SewageNetwork(BaseModel):
    __tablename__ = "sewage_networks"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    zone_name = Column(String(100), nullable=False)
    capacity_percentage = Column(Numeric(5, 2), default=0)
    network_status = Column(String(50), default="normal")

class WasteManagement(BaseModel):
    __tablename__ = "waste_management"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    zone_name = Column(String(100), nullable=False)
    bin_type = Column(String(50), nullable=False) # recycling, compost, landfill
    fill_level_percentage = Column(Numeric(5, 2), default=0)
    needs_collection = Column(Boolean, default=False)

class SolarPanel(BaseModel):
    __tablename__ = "solar_panels"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="SET NULL"), nullable=True)
    panel_array_id = Column(String(50), nullable=False)
    current_output_kw = Column(Numeric(10, 2), default=0)
    efficiency_percentage = Column(Numeric(5, 2), default=100.0)
    panel_status = Column(String(50), default="active")

class Battery(BaseModel):
    __tablename__ = "batteries"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="SET NULL"), nullable=True)
    charge_level_percentage = Column(Numeric(5, 2), default=100.0)
    capacity_kwh = Column(Numeric(10, 2), nullable=False)
    is_charging = Column(Boolean, default=False)
    battery_status = Column(String(50), default="active")

class Generator(BaseModel):
    __tablename__ = "generators"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="SET NULL"), nullable=True)
    fuel_level_percentage = Column(Numeric(5, 2), default=100.0)
    output_capacity_kw = Column(Numeric(10, 2), nullable=False)
    is_running = Column(Boolean, default=False)
    generator_status = Column(String(50), default="standby")

class Asset(BaseModel):
    __tablename__ = "assets"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    asset_type = Column(String(50), nullable=False) # hvac, elevator, escalator, turnstile, screen
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="SET NULL"), nullable=True)
    manufacturer = Column(String(100), nullable=True)
    installation_date = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    iot_devices = relationship("IoTDevice", back_populates="asset", cascade="all, delete-orphan")
    maintenance_schedules = relationship("MaintenanceSchedule", back_populates="asset", cascade="all, delete-orphan")
    maintenance_logs = relationship("MaintenanceLog", back_populates="asset", cascade="all, delete-orphan")

class IoTDevice(BaseModel):
    __tablename__ = "iot_devices"
    
    asset_id = Column(Integer, ForeignKey("assets.id", ondelete="CASCADE"), nullable=True, index=True)
    device_id = Column(String(100), unique=True, index=True, nullable=False)
    device_type = Column(String(50), nullable=False)
    firmware_version = Column(String(50), nullable=True)
    is_online = Column(Boolean, default=True)
    last_ping_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    asset = relationship("Asset", back_populates="iot_devices")
    sensors = relationship("Sensor", back_populates="device", cascade="all, delete-orphan")

class Sensor(BaseModel):
    __tablename__ = "sensors"
    
    device_id = Column(Integer, ForeignKey("iot_devices.id", ondelete="CASCADE"), nullable=False, index=True)
    sensor_type = Column(String(50), nullable=False) # temperature, humidity, vibration, motion
    current_value = Column(Numeric(10, 2), nullable=True)
    unit = Column(String(20), nullable=True)
    
    # Relationships
    device = relationship("IoTDevice", back_populates="sensors")

class MaintenanceSchedule(BaseModel):
    __tablename__ = "maintenance_schedules"
    
    asset_id = Column(Integer, ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True)
    task_description = Column(String(255), nullable=False)
    frequency_days = Column(Integer, nullable=False)
    next_due_date = Column(DateTime(timezone=True), nullable=False)
    assigned_to_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    
    # Relationships
    asset = relationship("Asset", back_populates="maintenance_schedules")

class MaintenanceLog(BaseModel):
    __tablename__ = "maintenance_logs"
    
    asset_id = Column(Integer, ForeignKey("assets.id", ondelete="CASCADE"), nullable=False, index=True)
    performed_by_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    performed_at = Column(DateTime(timezone=True), nullable=False)
    action_taken = Column(String(255), nullable=False)
    cost = Column(Numeric(10, 2), nullable=True)
    parts_replaced = Column(JSON, nullable=True)
    
    # Relationships
    asset = relationship("Asset", back_populates="maintenance_logs")

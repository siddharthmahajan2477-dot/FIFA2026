from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, Numeric, JSON
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class Building(BaseModel):
    __tablename__ = "buildings"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    building_type = Column(String(50), nullable=False) # e.g. Main Stadium, Training Facility, Media Center
    
    # Relationships
    entrances = relationship("Entrance", back_populates="building", cascade="all, delete-orphan")
    facilities = relationship("Facility", back_populates="building", cascade="all, delete-orphan")

class Location(BaseModel):
    __tablename__ = "locations"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    latitude = Column(Numeric(10, 8), nullable=True)
    longitude = Column(Numeric(11, 8), nullable=True)
    level = Column(Integer, default=1) # Floor level
    
    # Relationships
    landmarks = relationship("Landmark", back_populates="location")

class Entrance(BaseModel):
    __tablename__ = "entrances"
    
    building_id = Column(Integer, ForeignKey("buildings.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(50), nullable=False) # e.g. "North Entrance"
    is_accessible = Column(Boolean, default=False)
    
    # Relationships
    building = relationship("Building", back_populates="entrances")
    gates = relationship("Gate", back_populates="entrance", cascade="all, delete-orphan")

class Gate(BaseModel):
    __tablename__ = "gates"
    
    entrance_id = Column(Integer, ForeignKey("entrances.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(50), nullable=False) # e.g. "Gate 1A"
    is_active = Column(Boolean, default=True)
    
    # Relationships
    entrance = relationship("Entrance", back_populates="gates")

class ParkingLot(BaseModel):
    __tablename__ = "parking_lots"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    capacity = Column(Integer, nullable=False)
    is_full = Column(Boolean, default=False)
    
    # Relationships
    slots = relationship("ParkingSlot", back_populates="lot", cascade="all, delete-orphan")

class ParkingSlot(BaseModel):
    __tablename__ = "parking_slots"
    
    lot_id = Column(Integer, ForeignKey("parking_lots.id", ondelete="CASCADE"), nullable=False, index=True)
    slot_number = Column(String(20), nullable=False)
    is_occupied = Column(Boolean, default=False)
    is_accessible = Column(Boolean, default=False)
    is_ev = Column(Boolean, default=False) # Electric Vehicle charging
    
    # Relationships
    lot = relationship("ParkingLot", back_populates="slots")

class Route(BaseModel):
    __tablename__ = "routes"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    start_location_id = Column(Integer, ForeignKey("locations.id", ondelete="CASCADE"), nullable=False)
    end_location_id = Column(Integer, ForeignKey("locations.id", ondelete="CASCADE"), nullable=False)
    distance_meters = Column(Numeric(10, 2), nullable=True)
    estimated_minutes = Column(Integer, nullable=True)
    path_coordinates = Column(JSON, nullable=True) # GeoJSON or list of lat/lng
    
    # Relationships
    start_location = relationship("Location", foreign_keys=[start_location_id])
    end_location = relationship("Location", foreign_keys=[end_location_id])

class Landmark(BaseModel):
    __tablename__ = "landmarks"
    
    location_id = Column(Integer, ForeignKey("locations.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)
    icon_url = Column(String(255), nullable=True)
    
    # Relationships
    location = relationship("Location", back_populates="landmarks")

class Facility(BaseModel):
    __tablename__ = "facilities"
    
    building_id = Column(Integer, ForeignKey("buildings.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    facility_type = Column(String(50), nullable=False) # Restroom, First Aid, Information Desk, ATM
    is_accessible = Column(Boolean, default=False)
    level = Column(Integer, default=1)
    
    # Relationships
    building = relationship("Building", back_populates="facilities")

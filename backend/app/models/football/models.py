from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime, Numeric, JSON
from sqlalchemy.orm import relationship
from backend.app.models.base import BaseModel

class Group(BaseModel):
    __tablename__ = "groups"
    
    name = Column(String(50), unique=True, index=True, nullable=False) # e.g. "Group A"
    
    # Relationships
    teams = relationship("Team", back_populates="group")
    standings = relationship("Standing", back_populates="group", cascade="all, delete-orphan")

class Team(BaseModel):
    __tablename__ = "teams"
    
    name = Column(String(100), unique=True, index=True, nullable=False)
    country_code = Column(String(3), unique=True, index=True, nullable=False)
    flag_url = Column(String(255), nullable=True)
    group_id = Column(Integer, ForeignKey("groups.id", ondelete="SET NULL"), nullable=True)
    
    # Relationships
    group = relationship("Group", back_populates="teams")
    players = relationship("Player", back_populates="team", cascade="all, delete-orphan")
    coaches = relationship("Coach", back_populates="team", cascade="all, delete-orphan")
    home_matches = relationship("Match", foreign_keys="[Match.home_team_id]", back_populates="home_team")
    away_matches = relationship("Match", foreign_keys="[Match.away_team_id]", back_populates="away_team")
    standings = relationship("Standing", back_populates="team", cascade="all, delete-orphan")

class Player(BaseModel):
    __tablename__ = "players"
    
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    jersey_number = Column(Integer, nullable=True)
    position = Column(String(50), nullable=False) # Goalkeeper, Defender, Midfielder, Forward
    date_of_birth = Column(String(10), nullable=True)
    
    # Relationships
    team = relationship("Team", back_populates="players")
    statistics = relationship("PlayerStatistic", back_populates="player", cascade="all, delete-orphan")
    match_events = relationship("MatchEvent", foreign_keys="[MatchEvent.player_id]", back_populates="player")

class Coach(BaseModel):
    __tablename__ = "coaches"
    
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False, default="Head Coach")
    
    # Relationships
    team = relationship("Team", back_populates="coaches")

class Venue(BaseModel):
    __tablename__ = "venues"
    
    city = Column(String(100), nullable=False, index=True)
    region = Column(String(100), nullable=True)
    country = Column(String(100), nullable=False)
    
    # Relationships
    stadiums = relationship("Stadium", back_populates="venue", cascade="all, delete-orphan")

class Stadium(BaseModel):
    __tablename__ = "stadiums"
    
    venue_id = Column(Integer, ForeignKey("venues.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    capacity = Column(Integer, nullable=False)
    timezone = Column(String(50), nullable=False)
    location_lat = Column(Numeric(10, 8), nullable=True)
    location_lng = Column(Numeric(11, 8), nullable=True)
    
    # Relationships
    venue = relationship("Venue", back_populates="stadiums")
    matches = relationship("Match", back_populates="stadium")

class Standing(BaseModel):
    __tablename__ = "standings"
    
    group_id = Column(Integer, ForeignKey("groups.id", ondelete="CASCADE"), nullable=False, index=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)
    matches_played = Column(Integer, default=0)
    wins = Column(Integer, default=0)
    draws = Column(Integer, default=0)
    losses = Column(Integer, default=0)
    goals_for = Column(Integer, default=0)
    goals_against = Column(Integer, default=0)
    points = Column(Integer, default=0)
    
    # Relationships
    group = relationship("Group", back_populates="standings")
    team = relationship("Team", back_populates="standings")

class Match(BaseModel):
    __tablename__ = "matches"
    
    stadium_id = Column(Integer, ForeignKey("stadiums.id", ondelete="RESTRICT"), nullable=False, index=True)
    home_team_id = Column(Integer, ForeignKey("teams.id", ondelete="RESTRICT"), nullable=False, index=True)
    away_team_id = Column(Integer, ForeignKey("teams.id", ondelete="RESTRICT"), nullable=False, index=True)
    
    scheduled_time = Column(DateTime(timezone=True), nullable=False, index=True)
    match_status = Column(String(50), default="scheduled", index=True) # scheduled, live, completed, postponed
    stage = Column(String(50), nullable=False) # Group Stage, Round of 16, Quarter Final, Semi Final, Final
    
    home_score = Column(Integer, default=0)
    away_score = Column(Integer, default=0)
    
    # Relationships
    stadium = relationship("Stadium", back_populates="matches")
    home_team = relationship("Team", foreign_keys=[home_team_id], back_populates="home_matches")
    away_team = relationship("Team", foreign_keys=[away_team_id], back_populates="away_matches")
    events = relationship("MatchEvent", back_populates="match", cascade="all, delete-orphan")
    statistics = relationship("MatchStatistic", back_populates="match", cascade="all, delete-orphan")

class MatchEvent(BaseModel):
    __tablename__ = "match_events"
    
    match_id = Column(Integer, ForeignKey("matches.id", ondelete="CASCADE"), nullable=False, index=True)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="SET NULL"), nullable=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)
    
    event_type = Column(String(50), nullable=False, index=True) # goal, yellow_card, red_card, substitution
    minute = Column(Integer, nullable=False)
    details = Column(JSON, nullable=True) # additional details like subbed_player_id
    
    # Relationships
    match = relationship("Match", back_populates="events")
    player = relationship("Player", foreign_keys=[player_id], back_populates="match_events")

class MatchStatistic(BaseModel):
    __tablename__ = "match_statistics"
    
    match_id = Column(Integer, ForeignKey("matches.id", ondelete="CASCADE"), nullable=False, index=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"), nullable=False, index=True)
    
    possession_percentage = Column(Numeric(5, 2), default=0)
    shots_total = Column(Integer, default=0)
    shots_on_target = Column(Integer, default=0)
    corners = Column(Integer, default=0)
    fouls = Column(Integer, default=0)
    yellow_cards = Column(Integer, default=0)
    red_cards = Column(Integer, default=0)
    
    # Relationships
    match = relationship("Match", back_populates="statistics")

class PlayerStatistic(BaseModel):
    __tablename__ = "player_statistics"
    
    player_id = Column(Integer, ForeignKey("players.id", ondelete="CASCADE"), nullable=False, index=True)
    match_id = Column(Integer, ForeignKey("matches.id", ondelete="CASCADE"), nullable=False, index=True)
    
    minutes_played = Column(Integer, default=0)
    goals = Column(Integer, default=0)
    assists = Column(Integer, default=0)
    passes = Column(Integer, default=0)
    pass_accuracy = Column(Numeric(5, 2), default=0)
    distance_covered = Column(Numeric(5, 2), default=0) # in km
    
    # Relationships
    player = relationship("Player", back_populates="statistics")
    match = relationship("Match")

class TournamentAward(BaseModel):
    __tablename__ = "tournament_awards"
    
    name = Column(String(100), unique=True, nullable=False) # Golden Boot, Golden Ball, Golden Glove
    description = Column(String(255), nullable=True)
    player_id = Column(Integer, ForeignKey("players.id", ondelete="SET NULL"), nullable=True)
    
    # Relationships
    player = relationship("Player")

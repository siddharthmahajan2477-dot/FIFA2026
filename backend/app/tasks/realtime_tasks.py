import asyncio
import random
from backend.app.tasks.celery_app import celery_app
from backend.app.realtime.dispatcher import event_dispatcher
from backend.app.core.logging import logger

def async_to_sync(awaitable):
    """Utility to run async code inside a synchronous celery task."""
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None

    if loop and loop.is_running():
        # If there's an existing event loop, create a task
        # Note: In a pure synchronous celery worker this shouldn't happen
        return asyncio.run_coroutine_threadsafe(awaitable, loop).result()
    else:
        return asyncio.run(awaitable)

@celery_app.task(name="backend.app.tasks.realtime_tasks.simulate_match_events")
def simulate_match_events():
    """Simulates live match data such as possession, shots, and timer."""
    logger.debug("Simulating live match events")
    
    # 1. Update Match Timer
    async_to_sync(event_dispatcher.publish_event(
        room="match_center",
        event_type="MATCH_TIMER_UPDATED",
        payload={"minute": random.randint(1, 90), "second": random.randint(0, 59)}
    ))
    
    # 2. Update Possession (Fan Dashboard & Match Center)
    home_possession = random.randint(35, 65)
    pos_payload = {"home": home_possession, "away": 100 - home_possession}
    
    async_to_sync(event_dispatcher.publish_event(
        room="match_center",
        event_type="POSSESSION_UPDATED",
        payload=pos_payload
    ))
    
    async_to_sync(event_dispatcher.publish_event(
        room="fan_dashboard",
        event_type="POSSESSION_UPDATED",
        payload=pos_payload
    ))
    
    # 3. Random Event (Goal / Card / Sub) with 5% probability
    if random.random() < 0.05:
        events = ["GOAL_SCORED", "YELLOW_CARD", "SUBSTITUTION"]
        event = random.choice(events)
        
        payload = {"team": random.choice(["Home", "Away"]), "player_id": random.randint(1, 22)}
        
        async_to_sync(event_dispatcher.publish_event(
            room="match_center",
            event_type=event,
            payload=payload
        ))
        
        async_to_sync(event_dispatcher.publish_event(
            room="fan_dashboard",
            event_type=event,
            payload=payload
        ))

@celery_app.task(name="backend.app.tasks.realtime_tasks.simulate_infrastructure")
def simulate_infrastructure():
    """Simulates infrastructure and operations telemetry."""
    logger.debug("Simulating infrastructure events")
    
    # Power / Generator Updates
    async_to_sync(event_dispatcher.publish_event(
        room="operations",
        event_type="POWER_METRICS_UPDATED",
        payload={
            "grid_draw_kw": random.uniform(2000, 2500),
            "solar_production_kw": random.uniform(100, 500),
            "generator_status": "standby"
        }
    ))
    
    # Washroom Occupancy Updates
    async_to_sync(event_dispatcher.publish_event(
        room="operations",
        event_type="WASHROOM_OCCUPANCY_UPDATED",
        payload={
            "zone_id": "North_A",
            "occupancy_percent": random.randint(10, 95),
            "queue_length": random.randint(0, 20)
        }
    ))

@celery_app.task(name="backend.app.tasks.realtime_tasks.simulate_security_medical")
def simulate_security_medical():
    """Simulates security and medical alerts."""
    logger.debug("Simulating security/medical events")
    
    # Crowd Density
    async_to_sync(event_dispatcher.publish_event(
        room="security",
        event_type="CROWD_DENSITY_UPDATED",
        payload={
            "sector": random.choice(["Gate A", "Gate B", "Concourse North", "Concourse South"]),
            "density_level": random.choice(["Low", "Medium", "High", "Critical"])
        }
    ))
    
    # Medical availability
    async_to_sync(event_dispatcher.publish_event(
        room="medical",
        event_type="MEDICAL_STAFF_UPDATED",
        payload={
            "available_staff": random.randint(5, 15),
            "active_incidents": random.randint(0, 3)
        }
    ))

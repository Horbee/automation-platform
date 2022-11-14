import sys
from miio import RoborockVacuum

if len(sys.argv) != 3:
    print("Usage: python3 get_room_ids.py <ip> <token>")
    sys.exit()

vac = RoborockVacuum(sys.argv[1], sys.argv[2])
timers = vac.timer()
t = [timer for timer in timers if timer.cron.startswith("0 0") and timer.enabled == False][0]
print(t)

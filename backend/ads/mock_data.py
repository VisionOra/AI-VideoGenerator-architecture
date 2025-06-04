import uuid
import datetime as dt

def session():
    return {
        "session_id": str(uuid.uuid4()),
        "state": "CollectMeta",
        "started_at": dt.datetime.utcnow().isoformat() + "Z"
    }

def meta():
    return {"scene_count": 3, "theme": "playful"}

def scenes():
    return [
        {"index": 1, "bg_prompt": "sunset beach",
         "headline": "Summer Sale!",   "cta": "Shop Now"},
        {"index": 2, "bg_prompt": "ice cream splash",
         "headline": "Cool Deals",     "cta": "Grab Yours"},
        {"index": 3, "bg_prompt": "friends cheering",
         "headline": "Join the Fun",   "cta": "Sign Up"}
    ]

def preview():
    return {
        "summary": "3-scene playful ad. Headlines: Summer Sale! / Cool Deals / Join the Fun",
        "preview_url": "https://placehold.co/600x400?text=Preview+Slideshow"
    }

def final_ad():
    return {"meta": meta(), "scenes": scenes()} 
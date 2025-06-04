#!/usr/bin/env python3
import requests
import json

BASE_URL = "http://localhost:8001/api"

def test_api():
    print("Testing Ad Builder API...")
    
    # Test start session
    print("\n1. Testing start session...")
    response = requests.post(f"{BASE_URL}/start-session/")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
    else:
        print(f"Error: {response.text}")
    
    # Test collect meta
    print("\n2. Testing collect meta...")
    response = requests.post(f"{BASE_URL}/collect-meta/", json={"scene_count": 3, "theme": "playful"})
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
    else:
        print(f"Error: {response.text}")
    
    # Test collect scenes
    print("\n3. Testing collect scenes...")
    response = requests.post(f"{BASE_URL}/collect-scenes/", json={"scenes": []})
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
    else:
        print(f"Error: {response.text}")
    
    # Test preview
    print("\n4. Testing preview...")
    response = requests.get(f"{BASE_URL}/preview/")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
    else:
        print(f"Error: {response.text}")
    
    # Test confirm
    print("\n5. Testing confirm...")
    response = requests.post(f"{BASE_URL}/confirm/", json={"action": "approve"})
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Response: {response.json()}")
    else:
        print(f"Error: {response.text}")

if __name__ == "__main__":
    test_api() 
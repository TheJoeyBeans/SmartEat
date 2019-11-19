import models
from flask import Blueprint, jsonify, request
from playhouse.shortcuts import model_to_dict

meal = Blueprint('meals', 'meal')

@meal.route('/', methods=["GET"])
def get_all_meals():
	try:
		meals = [model_to_dict(meal) for meal in models.Meal.select()]
		print(meals)
		return josnify(data=meals, status={"code": 200, "message": "Success"})
	except models.DoesNotExist:
		return josnify(data={}, status={"code": 401, "message": "Error getting the resources"})

@meal.route('/', methods=['POST'])
def create_meal():
	payload = request.get_json()
	meal = models.Meal.create(**payload)
	meal_dict = model_to_dict(meal)
	return jsonify(data=meal_dict, status={"code": 201, "message": "Success"})
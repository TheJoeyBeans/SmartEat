import models
from flask import Blueprint, jsonify, request
from playhouse.shortcuts import model_to_dict

foodItem = Blueprint('foodItems', 'foodItem')

@foodItem.route('/', methods=['GET'])
def get_all_foodItems():
	try:
		foodItems = [model_to_dict(foodItem) for foodItem in models.Food_item.select()]
		print(foodItems)
		return jsonify(data=foodItems, status={"code": 200, "message": "Success"})
	except models.DoesNotExist:
		return jsonify(data={}, status={"code": 401, "message": "Error getting the resources"})

@foodItem.route('/', methods=['POST'])
def create_foodItem():
	payload = request.get_json()
	foodItem = models.Food_item.create(**payload)
	foodItem_dict = model_to_dict(foodItem)
	return jsonify(data=foodItem_dict, status={"code": 201, "message": "Success"})
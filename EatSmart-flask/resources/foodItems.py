import models
from flask import Blueprint, jsonify, request
from playhouse.shortcuts import model_to_dict

foodItem = Blueprint('foodItems', 'foodItem')

@foodItem.route('/', methods=['POST'])
def create_foodItem():
	payload = request.get_json()
	foodItem = models.Food_item.create(**payload)
	foodItem_dict = model_to_dict(foodItem)
	return jsonify(data=foodItem_dict, status={"code": 201, "message": "Success"})
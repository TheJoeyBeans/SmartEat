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

@foodItem.route('/<id>/', methods=['PUT'])
def updated_foodItem(id):
	payload = request.get_json()
	foodItem_to_update = models.Food_item.get(id=id)

	foodItem_to_update.update(
		food_name=payload['food_name'],
		food_calories=payload['food_calories']
	).execute()

	update_foodItem_dict = model_to_dict(foodItem_to_update, max_depth=0)
	return jsonify(status={'code': 200, 'msg': 'success'}, data=update_foodItem_dict)

@foodItem.route('/', methods=['POST'])
def create_foodItem():
	payload = request.get_json()
	foodItem = models.Food_item.create(**payload)
	foodItem_dict = model_to_dict(foodItem)
	return jsonify(data=foodItem_dict, status={"code": 201, "message": "Success"})

@foodItem.route('/<id>/', methods=["DELETE"])
def delete_foodItem(id):

	foodItem_to_delete = models.Food_item.get(id=id)
	foodItem_to_delete.delete()
	return jsonify(data='resource successfully deleted', status={"code": 200, "message": "resource deleted successfully"})
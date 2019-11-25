from peewee import *

DATABASE = SqliteDatabase('eat.sqlite')

class Meal(Model):
	meal_type = CharField()
	calories = IntegerField()

	class Meta: 
		db_table = 'meals'
		database = DATABASE

class Food_item(Model):
	food_name = CharField()
	food_calories = IntegerField()
	food_unique_id = CharField()
	meal = ForeignKeyField(Meal, backref='food_items')

	class Meta:
		db_table = 'food_items'
		database = DATABASE

def initialize():
	DATABASE.connect()
	DATABASE.create_tables([Meal, Food_item], safe=True)
	print('TABLES Created')
	DATABASE.close()

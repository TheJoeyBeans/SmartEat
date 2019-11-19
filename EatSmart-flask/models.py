from peewee import *

DATABASE = SqliteDatabase('eat.sqlite')

class Meal(Model):
	meal_type = CharField()
	food = CharField()
	calories = IntegerField()

	class Meta: 
		db_table = 'meals'
		database = DATABASE

def initialize():
	DATABASE.connect()
	DATABASE.create_tables([Meal], safe=True)
	print('TABLES Created')
	DATABASE.close()

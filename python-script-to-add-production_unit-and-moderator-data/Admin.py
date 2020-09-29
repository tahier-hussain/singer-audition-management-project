import pymongo
import requests
import json

client = pymongo.MongoClient("mongodb://localhost:27017/")

database = client["singer-audition-management"] 

data = database["admin"]

name = raw_input("Enter Name: ") 
email = raw_input("Enter Email: " )
password = raw_input("Enter Password: ")
confirm_password = raw_input("Confirm Password: ")
user_type = raw_input("Enter User Type: ")

password_strength = False

while(password_strength == False):
  atleastOneUpperCaseCharacter = False
  atleastOneLowerCaseCharacter = False
  atleastOneNumber = False
  atleastOneSpecialCharacter = False
  i = 0
  while i < len(password):
    if(ord(password[i]) >= 48 and ord(password[i]) <= 57):
      atleastOneNumber = True
    elif(ord(password[i]) >= 65 and ord(password[i]) <= 90):
      atleastOneUpperCaseCharacter= True
    elif(ord(password[i]) >= 97 and ord(password[i]) <= 122):
      atleastOneLowerCaseCharacter= True
    else:
      atleastOneSpecialCharacter= True
    i = i + 1
  if(atleastOneLowerCaseCharacter == True and atleastOneUpperCaseCharacter == True and atleastOneNumber == True and atleastOneSpecialCharacter == True and len(password) >= 8):
    break
  else:
    print("Password must contian atleast 8 characters, with atleast one upper case character, lower case character, special character and a number")
    password = raw_input("Re enter password: ")

admin = {}
admin['name'] = name
admin['email'] = email
admin['password'] = password
admin['confirm_password'] = confirm_password

headers = { "Content-Type" : "application/json"}

url = ""
if(user_type == "moderator"):
  url = "http://localhost:5000/api/register"
else:
  url = "http://localhost:5000/api/production-unit-register"

response = requests.post(url, data=json.dumps(admin), headers=headers)

print(response.content)


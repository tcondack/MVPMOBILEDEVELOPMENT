from django.test import TestCase
from django.contrib.auth.models import User
import json

class logintest (TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="admin",
            password="123456",
            is_staff=True,
        )
        self.usuario = User.objects.create_user(
            username="usuario_teste",
            password="123456",
            is_staff=False,
        )

    def test_admin(self):
        response = self.client.post(
            "/api/login/",data=json.dumps({
                "username": "admin",
                "password": "123456",
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["success"], True)
        self.assertEqual(response.json()["user"]["username"], "admin")

    def test_admin_erro(self):
            response = self.client.post(
                "/api/login/",data=json.dumps({
                    "username": "admin",
                    "password": "159154",
                }),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 401)
            self.assertEqual(response.json()["success"], False)
    
    def test_usuario(self):
        response = self.client.post(
            "/api/login/",data=json.dumps({
                "username": "usuario_teste",
                "password": "123456",
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()["success"], False)


    def test_sem_cadastro(self):
            response = self.client.post(
                "/api/login/",data=json.dumps({
                    "username":"Getulio",
                    "password":"senha123456",
                 }),
                content_type ='application/json'
            )
            self.assertEqual(response.status_code, 401)
            self.assertEqual(response.json()["success"], False)



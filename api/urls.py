
# urls.py
from django.urls import path
from .views import get_product_fields
app_name='api'
urlpatterns = [
    path('api/product-fields/', get_product_fields, name='get_product_fields'),
]

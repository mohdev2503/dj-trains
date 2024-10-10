# views.py
from django.http import JsonResponse
from .models import Product

def get_product_fields(request):
    fields = Product._meta.get_fields()
    field_info = {
        field.name: {
            'type': field.get_internal_type(),
            'max_length': getattr(field, 'max_length', None),
            'null': field.null,
            'choices': getattr(field, 'choices', None),
        }
        for field in fields
    }
    return JsonResponse(field_info)

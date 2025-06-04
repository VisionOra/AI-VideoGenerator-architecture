from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from . import mock_data

@method_decorator(csrf_exempt, name='dispatch')
class StartSession(APIView):
    def post(self, request):
        return Response(mock_data.session())

@method_decorator(csrf_exempt, name='dispatch')
class CollectMeta(APIView):
    def post(self, request):
        return Response({"meta": mock_data.meta()})

@method_decorator(csrf_exempt, name='dispatch')
class CollectScenes(APIView):
    def post(self, request):
        return Response({"scenes": mock_data.scenes()})

class RenderPreview(APIView):
    def get(self, request):
        return Response(mock_data.preview())

@method_decorator(csrf_exempt, name='dispatch')
class Confirm(APIView):
    def post(self, request):
        action = request.data.get("action")
        if action == "approve":
            return Response({"status": "approved", "ad": mock_data.final_ad()})
        return Response({"status": "edit-requested", "scene": request.data.get("scene")}) 
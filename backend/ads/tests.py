from rest_framework.test import APITestCase
from rest_framework import status

class AdBuilderIntegrationTest(APITestCase):
    def test_full_ad_builder_flow(self):
        response = self.client.post('/api/start-session/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('session_id', response.data)
        self.assertEqual(response.data['state'], 'CollectMeta')

        response = self.client.post('/api/collect-meta/', {'scene_count': 3, 'theme': 'playful'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('meta', response.data)

        response = self.client.post('/api/collect-scenes/', {'scenes': []})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('scenes', response.data)
        self.assertEqual(len(response.data['scenes']), 3)

        response = self.client.get('/api/preview/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('preview_url', response.data)

        response = self.client.post('/api/confirm/', {'action': 'approve'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'approved')
        self.assertIn('ad', response.data) 
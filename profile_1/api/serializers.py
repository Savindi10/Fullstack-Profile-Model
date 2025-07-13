from rest_framework import serializers
from .models import Profile   

#This will convert your model instances to JSON automatically
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile             
        fields = '__all__'          

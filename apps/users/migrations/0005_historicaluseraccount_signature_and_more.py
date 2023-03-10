# Generated by Django 4.1.5 on 2023-02-23 12:37

import apps.users.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_historicaluseraccount_role_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicaluseraccount',
            name='signature',
            field=models.TextField(blank=True, max_length=100, null=True, verbose_name='Firma'),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='signature',
            field=models.ImageField(blank=True, null=True, upload_to=apps.users.models.custom_thumbnail_file_path, verbose_name='Firma'),
        ),
    ]

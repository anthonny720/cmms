# Generated by Django 4.1.5 on 2023-02-23 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_historicaluseraccount_signature_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicaluseraccount',
            name='role',
            field=models.CharField(choices=[('Técnico', 'Technical'), ('Visualizador', 'Visualizer'), ('Editor', 'Editor'), ('Supervisor', 'Supervisor')], default='Editor', max_length=13, verbose_name='Rol'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='role',
            field=models.CharField(choices=[('Técnico', 'Technical'), ('Visualizador', 'Visualizer'), ('Editor', 'Editor'), ('Supervisor', 'Supervisor')], default='Editor', max_length=13, verbose_name='Rol'),
        ),
    ]

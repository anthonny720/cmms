# Generated by Django 4.1.5 on 2023-02-11 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicaluseraccount',
            name='address',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección'),
        ),
        migrations.AlterField(
            model_name='historicaluseraccount',
            name='dni',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='DNI'),
        ),
        migrations.AlterField(
            model_name='historicaluseraccount',
            name='first_name',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Nombres'),
        ),
        migrations.AlterField(
            model_name='historicaluseraccount',
            name='last_name',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Apellidos'),
        ),
        migrations.AlterField(
            model_name='historicaluseraccount',
            name='phone',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Teléfono'),
        ),
        migrations.AlterField(
            model_name='historicaluseraccount',
            name='role',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Técnico', 'Technical'), ('Visualizador', 'Visualizer'), ('Editor', 'Editor')], default='Visualizador', max_length=12, verbose_name='Rol'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='address',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Dirección'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='dni',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='DNI'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='first_name',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Nombres'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='last_name',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Apellidos'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='phone',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='Teléfono'),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='role',
            field=models.CharField(choices=[('Admin', 'Admin'), ('Técnico', 'Technical'), ('Visualizador', 'Visualizer'), ('Editor', 'Editor')], default='Visualizador', max_length=12, verbose_name='Rol'),
        ),
    ]

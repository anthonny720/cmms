# Generated by Django 4.1.5 on 2023-02-22 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_requirements_historicalrequirements'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalrequirements',
            name='status',
            field=models.CharField(choices=[('Pendiente', 'Pendiente'), ('Aprobado', 'Aprobado'), ('Rechazado', 'Rechazado'), ('Parcial', 'Parcial'), ('Finalizado', 'Finalizado')], default='Pendiente', max_length=20, verbose_name='Estado'),
        ),
        migrations.AlterField(
            model_name='requirements',
            name='status',
            field=models.CharField(choices=[('Pendiente', 'Pendiente'), ('Aprobado', 'Aprobado'), ('Rechazado', 'Rechazado'), ('Parcial', 'Parcial'), ('Finalizado', 'Finalizado')], default='Pendiente', max_length=20, verbose_name='Estado'),
        ),
    ]

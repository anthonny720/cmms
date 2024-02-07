import uuid
from pathlib import Path

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from simple_history.models import HistoricalRecords


def user_signature_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return Path('users') / instance.get_full_name().replace(' ', '_') / filename


class UserCategory(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    description = models.CharField(max_length=255, verbose_name='Descripción', blank=True, null=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Salario', default=0.00)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El correo electrónico es obligatorio para los usuarios')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    class Meta:
        verbose_name_plural = 'Usuarios'
        verbose_name = 'Usuario'

    class RolesChoices(models.TextChoices):
        TECHNICAL = 'T', 'Técnico'
        SUPERVISOR = 'S', 'Supervisor'
        PLANNER = 'P', 'Planner'
        REQUESTER = 'R', 'Solicitante'
        OTHER = 'OT', 'Otro'
        BOSS = 'B', 'Jefe'

    email = models.EmailField(max_length=255, unique=True, verbose_name='Email')
    first_name = models.CharField(max_length=255, verbose_name='Nombres', blank=True, null=True)
    last_name = models.CharField(max_length=255, verbose_name='Apellidos', blank=True, null=True)
    phone = models.CharField(max_length=255, verbose_name='Teléfono', blank=True, null=True)
    dni = models.CharField(max_length=255, verbose_name='DNI', blank=True, null=True)
    category = models.ForeignKey(UserCategory, on_delete=models.CASCADE, verbose_name='Categoría', blank=True,
                                 null=True, related_name='users')
    signature = models.ImageField(upload_to=user_signature_file_path, verbose_name='Firma', blank=True, null=True)
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    is_staff = models.BooleanField(default=False, verbose_name='Staff')
    role = models.CharField(max_length=2, choices=RolesChoices.choices, default=RolesChoices.OTHER, verbose_name='Rol')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    history = HistoricalRecords()

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_signature(self):
        return self.signature if self.signature else ''

    def get_role_name(self):
        return self.get_role_display() if self.role else ''

    def get_full_name(self):
        if self.first_name is None:
            self.first_name = ''
        if self.last_name is None:
            self.last_name = ''
        return self.first_name + ' ' + self.last_name

    def get_category_name(self):
        return self.category.name if self.category else ''

    def __str__(self):
        return self.email


@receiver(pre_save, sender=UserAccount)
def pre_save_user_signature(sender, instance, **kwargs):
    if not instance.pk:
        return
    try:
        old_file = sender.objects.get(pk=instance.pk).signature
        new_file = instance.signature
        if not old_file == new_file:
            old_file.delete(save=False)
    except sender.DoesNotExist:
        pass


@receiver(post_delete, sender=UserAccount)
def post_delete_user_signature(sender, instance, **kwargs):
    if instance.signature:
        instance.signature.delete(save=False)


class ThirdParties(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    ruc = models.CharField(max_length=255, verbose_name='RUC', blank=True, null=True, )
    direction = models.CharField(max_length=255, verbose_name='Dirección', blank=True, null=True, )
    phone = models.CharField(max_length=255, verbose_name='Teléfono', blank=True, null=True, )
    email = models.CharField(max_length=255, verbose_name='Email', blank=True, null=True)
    representative = models.CharField(max_length=255, verbose_name='Representante', blank=True, null=True)
    description = models.CharField(max_length=255, verbose_name='Descripción', blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Terceros'
        verbose_name = 'Tercero '

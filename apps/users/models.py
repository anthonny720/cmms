import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from simple_history.models import HistoricalRecords


# Create your models here.

def custom_thumbnail_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return '/'.join(['Users', instance.first_name, filename])


class UserCategory(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    description = models.CharField(max_length=255, verbose_name='Descripción', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    salary = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Salario', default=0.00)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categorías'
        verbose_name = 'Categoría '


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()
        user.role = '8'

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    class RolesStatus(models.TextChoices):
        technical = 'Técnico'
        visualizer = 'Visualizador'
        editor = 'Editor'
        supervisor = 'Supervisor'
        compras = 'Compras'

    email = models.EmailField(max_length=255, unique=True, verbose_name='Email')
    first_name = models.CharField(max_length=255, verbose_name='Nombres', blank=True, null=True)
    last_name = models.CharField(max_length=255, verbose_name='Apellidos', blank=True, null=True)
    address = models.CharField(max_length=255, verbose_name='Dirección', blank=True, null=True)
    phone = models.CharField(max_length=255, verbose_name='Teléfono', blank=True, null=True)
    dni = models.CharField(max_length=255, verbose_name='DNI', blank=True, null=True)
    category = models.ForeignKey(UserCategory, on_delete=models.CASCADE, verbose_name='Categoría', blank=True,
                                 null=True)
    signature = models.ImageField(upload_to=custom_thumbnail_file_path, verbose_name='Firma', blank=True, null=True)
    is_active = models.BooleanField(default=True, )
    is_staff = models.BooleanField(default=False)
    role = models.CharField(max_length=13, choices=RolesStatus.choices, default=RolesStatus.editor,
                            verbose_name='Rol')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    history = HistoricalRecords()

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_signature(self):
        try:
            return self.signature.url
        except:
            return ''


    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def get_category_name(self):
        try:
            return self.category.name
        except:
            return ''

    def get_short_name(self):
        return self.first_name

    def get_admin(self):
        return self.is_superuser

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'Usuarios'
        verbose_name = 'Usuario'

@receiver(pre_save, sender=UserAccount)
def pre_save_image(sender, instance, *args, **kwargs):
    try:
        old_img = instance.__class__.objects.get(id=instance.id).signature.path
        try:
            new_img = instance.signature.path
        except:
            new_img = None
        if new_img != old_img:
            import os
            if os.path.exists(old_img):
                os.remove(old_img)
    except:
        pass


@receiver(post_delete, sender=UserAccount)
def post_save_image(sender, instance, *args, **kwargs):
    """ Clean Old Image file """
    try:
        instance.signature.delete(save=False)
    except:
        pass

class ThirdParties(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nombre')
    ruc= models.CharField(max_length=255, verbose_name='RUC',blank=True,null=True,)
    direction = models.CharField(max_length=255, verbose_name='Dirección',blank=True,null=True,)
    phone = models.CharField(max_length=255, verbose_name='Teléfono',blank=True,null=True,)
    email= models.CharField(max_length=255, verbose_name='Email',blank=True,null=True)
    representative = models.CharField(max_length=255, verbose_name='Representante',blank=True,null=True)
    description = models.CharField(max_length=255, verbose_name='Descripción', blank=True, null=True)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Terceros'
        verbose_name = 'Tercero '
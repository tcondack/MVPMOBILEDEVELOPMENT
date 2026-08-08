from django.db import models
from django.contrib.postgres.fields import ArrayField  


class Parque(models.Model):
    nome =models.CharField(max_length=120)
    descricao = models.TextField()
    localizacao = models.TextField()
    horario_funcionamento = models.CharField(max_length=100)
    taxa_entrada = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    imagem = models.ImageField(upload_to='parques/', null=True, blank=True)
    dias_funcionamento = ArrayField(
        models.CharField(max_length=20),
        default=list,
        blank=True
    )
    
    obs_disponibilidade = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        help_text="Ex: Fechado para manutenção nas segundas-feiras de Janeiro."
    )
    def __str__(self):
        return self.nome

class Trilhas(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.CASCADE)
    nome = models.CharField(max_length=120)
    descricao = models.TextField()
    dificuldade = models.CharField(max_length=30, choices=[('Fácil', 'Fácil'), ('Médio', 'Médio'), ('Difícil', 'Difícil')])
    distancia = models.DecimalField(max_digits=8, decimal_places=2)
    imagem = models.ImageField(upload_to='trilhas/', null=True, blank=True)
    aviso_disponibilidade = models.CharField(max_length=255, null=True, blank=True, help_text="")
    ativo = models.BooleanField(default=True)
    class Meta:
        verbose_name="Trilha"
        verbose_name_plural="Trilhas"
    def __str__(self):
        return self.nome

class Eventos(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.CASCADE)
    nome = models.CharField(max_length=120)
    descricao = models.TextField()
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    preco = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    imagem = models.ImageField(upload_to='eventos/', null=True, blank=True)
    ativo = models.BooleanField(default=True)
    class Meta:
            verbose_name="Evento"
            verbose_name_plural="Eventos"
    def __str__(self):
        return self.nome


class Novidades(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=150)
    conteudo = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)
    ativo = models.BooleanField(default=True)
    class Meta:
            verbose_name="Novidade"
            verbose_name_plural="Novidades"
    def __str__(self):
        return f"{self.parque.nome} - {self.titulo}"
    
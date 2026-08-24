from django.db import models
from django.contrib.postgres.fields import ArrayField  
from django.core.exceptions import ValidationError

class HorarioFuncionamento(models.Model):
    DIA_CHOICES = [
        ('segunda-feira', 'Segunda-feira'),
        ('terça-feira', 'Terça-feira'),
        ('quarta-feira', 'Quarta-feira'),
        ('quinta-feira', 'Quinta-feira'),
        ('sexta-feira', 'Sexta-feira'),
        ('sábado', 'Sábado'),
        ('domingo', 'Domingo'),
    ]
    parque = models.ForeignKey('Parque', on_delete=models.CASCADE, related_name='horarios')
    dia_semana = models.CharField(max_length=20, choices=DIA_CHOICES)
    horario_abertura = models.TimeField(null=True, blank=True)
    horario_fechamento = models.TimeField(null=True, blank=True)
    fechado = models.BooleanField(default=False) 
    observacao_especial = models.CharField(max_length=100, blank=True, null=True, help_text="Ex: (Dia dos Pais)")

    class Meta:
        verbose_name = "Horário de Funcionamento"
        verbose_name_plural = "Horários de Funcionamento"
        unique_together = ('parque', 'dia_semana')

    def __str__(self):
        return f"{self.parque.nome} - {self.dia_semana}"


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
    def clean(self):
        # Validação cruzada: Garante que a trilha não estoure o horário de funcionamento do parque
        horarios_parque = self.parque.horarios.filter(fechado=False)
        for h in horarios_parque:
            if self.limite_entrada < h.horario_abertura:
                raise ValidationError(f"A entrada da trilha ({self.limite_entrada}) não pode abrir antes do parque ({h.horario_abertura}) na {h.get_dia_semana_display()}.")
            if self.limite_saida > h.horario_fechamento:
                raise ValidationError(f"O limite de saída ({self.limite_saida}) não pode passar do fechamento do parque ({h.horario_fechamento}) na {h.get_dia_semana_display()}.")
    
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
    def clean(self):
        # Mapeamento de dias da semana do Python para o seu padrão de banco de dados
        dias_traducao = {
            0: 'segunda-feira', 1: 'terça-feira', 2: 'quarta-feira',
            3: 'quinta-feira', 4: 'sexta-feira', 5: 'sábado', 6: 'domingo'
        }
        
        dia_semana_inicio = dias_traducao[self.data_inicio.weekday()]
        dia_semana_fim = dias_traducao[self.data_fim.weekday()]

        # Busca as regras daquele dia específico do parque
        horario_parque_inicio = self.parque.horarios.filter(dia_semana=dia_semana_inicio).first()
        horario_parque_fim = self.parque.horarios.filter(dia_semana=dia_semana_fim).first()

        # 1. Valida se o parque está aberto nos dias escolhidos
        if horario_parque_inicio and horario_parque_inicio.fechado:
            raise ValidationError(f"Não é possível agendar o evento. O parque está fechado na {dia_semana_inicio}.")
        if horario_parque_fim and horario_parque_fim.fechado:
            raise ValidationError(f"Não é possível agendar o evento. O parque está fechado na {dia_semana_fim}.")

        # 2. Valida se o horário do evento respeita as travas do parque
        if horario_parque_inicio:
            if self.data_inicio.time() < horario_parque_inicio.horario_abertura:
                raise ValidationError(f"O evento não pode começar às {self.data_inicio.time()} porque o parque abre às {horario_parque_inicio.horario_abertura} na {dia_semana_inicio}.")
        
        if horario_parque_fim:
            if self.data_fim.time() > horario_parque_fim.horario_fechamento:
                raise ValidationError(f"O evento não pode terminar às {self.data_fim.time()} porque o parque fecha às {horario_parque_fim.horario_fechamento} na {dia_semana_fim}.")

    def __str__(self):
        return self.nome


class Novidades(models.Model):
    parque = models.ForeignKey(Parque, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=150)
    conteudo = models.TextField()
    data_publicacao = models.DateTimeField(auto_now_add=True)
    ativo = models.BooleanField(default=True)
    imagem = models.ImageField(upload_to='novidades/', null=True, blank=True)

    class Meta:
            verbose_name="Novidade"
            verbose_name_plural="Novidades"
    def __str__(self):
        return f"{self.parque.nome} - {self.titulo}"
    
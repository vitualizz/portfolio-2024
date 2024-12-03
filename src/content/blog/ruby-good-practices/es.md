---
title: Buenas Prácticas en Ruby (y Rails)
seoTitle: 'Buenas Prácticas en Ruby (y Rails)'
date: 2024-10-11
author: Lee Palacios
tags: ['ruby', 'rails', 'best-practices']
lang: es
cover: ./cover.webp
coverLink: https://rubyonrails.org
shortDescription: Este artículo detalla buenas prácticas en base a la experiencia que tengo para escribir código Ruby limpio, mantenible y eficiente.
longDescription: Este artículo detalla buenas prácticas en base a la experiencia que tengo para escribir código Ruby limpio, mantenible y eficiente. Aunque algunas de estas prácticas son específicas de Ruby, muchas de ellas también se aplican a otros lenguajes de programación.
---
# Buenas Prácticas en Ruby (y Rails)

Este artículo detalla buenas prácticas en base a la experiencia que tengo para escribir código Ruby limpio, mantenible y eficiente. Aunque algunas de estas prácticas son específicas de Ruby, muchas de ellas también se aplican a otros lenguajes de programación.

## 1. **Usa nombres descriptivos**

Los nombres de variables y métodos deben ser descriptivos y reflejar su propósito. Esto facilita la lectura y comprensión del código, tanto para ti como para otros desarrolladores.

```ruby
# Mal
def calc(a)
  a + 10
end

# Bien
def calc_with_bonus(number)
  number + 10
end
```

## 2. **Usa Guard Clauses**

Las guard clauses son declaraciones condicionales que devuelven temprano si no se cumple una condición. Esto evita la anidación excesiva de bloques `if` y mejora la legibilidad del código.

```ruby
# Mal
def create_order(user, order_params)
  if user.present?
    if order_params.present?
      Order.create(order_params)
    else
      raise 'Order params are required'
    end
  else
    raise 'User is required'
  end
end

# Bien
def create_order(user, order_params)
  raise 'User is required' unless user.present?
  raise 'Order params are required' unless order_params.present?

  Order.create(order_params)
end
```

## 3. **Evita los métodos largos**

Los métodos largos son difíciles de entender y mantener. En la posibilidad sigue el principio de responsabilidad única y divide los métodos largos en métodos más pequeños y específicos.

```ruby
# Malo
def process_order(user, order_params)
  total = order_params[:items].sum { |item| item[:price] }
  order = Order.create(user: user, total: total, status: 'pending')

  if user.loyalty_points > 100
    order.apply_discount(10)
  end

  order.send_confirmation_email
end

# Bueno
def process_order(user, order_params)
  total = calculate_total(order_params[:items])
  order = create_order(user, total)

  apply_discount_if_eligible(user, order)
  send_order_confirmation(order)
end

private

def calculate_total(items)
  items.sum { |item| item[:price] }
end

def create_order(user, total)
  Order.create(user: user, total: total, status: 'pending')
end

def apply_discount_if_eligible(user, order)
  order.apply_discount(10) if user.loyalty_points > 100
end

def send_order_confirmation(order)
  order.send_confirmation_email
end
```

## Ya metiendonos en Rails

## 4. **Usa scopes para consultas comunes**

Los scopes son métodos que devuelven una relación ActiveRecord, lo que permite encadenarlos con otros métodos de consulta. Úsalos para consultas comunes y para mantener el código DRY.

```ruby
class User < ApplicationRecord
  scope :active, -> { where(active: true) }
  scope :admins, -> { where(role: 'admin') }
end
```

A esto no te olvides tambien usar Object Queries para consultas más complejas y mantener el código más limpio.
Tip: Normalmente yo lo uso creando un nuevo directorio en `app/queries` y creando un archivo por cada consulta.

```ruby
# app/queries/users_query.rb
class UsersQuery
  def self.active_admins
    User.active.admins
  end

  # Queries complejas
  def self.with_orders
    query = <<~SQL
      SELECT users.*
      FROM users
      JOIN orders ON orders.user_id = users.id
      WHERE orders.active = true
      ...
    SQL

    User.find_by_sql(query)
  end
end
```

## 6. **Siempre enfocate en el rendimiento**

- **Evita N+1 queries**: Usa `includes` o `joins` para cargar asociaciones en una sola consulta.
- **Usa caché**: Usa caché para almacenar datos que no cambian con frecuencia y mejorar el rendimiento.
- **Evita callbacks costosos**: Los callbacks pueden ser costosos y difíciles de depurar. Es preferible usar jobs o servicios para tareas complejas.

## 7. **Testing como forma de vida**

Escribe pruebas para tu código. Las pruebas automatizadas garantizan que tu código funcione como se espera y facilitan la refactorización. Utiliza RSpec, Minitest o cualquier otra herramienta de prueba que prefieras.

## Conclusión

Estas son solo algunas de las buenas prácticas que puedes seguir al escribir código Ruby y Rails. Recuerda que la programación es un arte y una ciencia, y siempre hay espacio para mejorar y aprender. Sigue practicando y disfrutando de la programación en Ruby!

### ¿Cuáles son tus buenas prácticas favoritas en Ruby y Rails? 🚀🛤️

---

**Tags**: `#Ruby`, `#Rails`, `#Programación`, `#BuenasPrácticas`